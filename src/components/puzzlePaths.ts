/** Jigsaw geometry for a `cols × rows` grid of `cellW × cellH` pieces.
 *
 *  Every interior seam is generated once and shared by the two pieces on
 *  either side of it (one walks it forwards, the other backwards), so the
 *  pieces interlock exactly and the outlines can be stroked without doubling.
 *  The knob is the classic three-cubic shape — a neck that dips in before the
 *  bulb swells out — sized from the shorter cell side so it looks the same on
 *  a horizontal seam as on a vertical one. */

export interface PuzzlePiece {
  col: number
  row: number
  /** SVG path data for the piece outline. */
  d: string
  /** The cell the piece occupies, before any knob is added. */
  x: number
  y: number
  w: number
  h: number
  /** The cell grown by the furthest a knob can reach on any side — the area
   *  a fill (photo, colour) must cover for the clipped piece to have no gaps. */
  bbox: { x: number; y: number; w: number; h: number }
}

type Point = readonly [number, number]

/** Knob height as a fraction of the shorter cell side — the bulb swells to
 *  three times this, so the furthest reach past the seam is `3 * TAB`. */
const TAB = 0.1
const REACH = 3 * TAB

/** Control points of one seam in seam-local units: `v` runs along the seam
 *  (0 → 1 is start → end of the knob's own footprint, centred on the seam),
 *  `w` runs across it, positive on the knob's side. Cubic chain: `M p0`, then
 *  `C p1 p2 p3`, `C p4 p5 p6`, `C p7 p8 p9`. */
const KNOB: readonly Point[] = [
  [0.0, 0],
  [0.2, 0],
  [0.5, -TAB],
  [0.5 - TAB, TAB],
  [0.5 - 2 * TAB, REACH],
  [0.5 + 2 * TAB, REACH],
  [0.5 + TAB, TAB],
  [0.5, -TAB],
  [0.8, 0],
  [1.0, 0],
]

/** The ten absolute points of a seam from `from` to `to`, with its knob on
 *  the side of the seam's clockwise normal when `side` is `1`, the other side
 *  when `-1`. `size` is the cell side the knob is scaled from. */
function seamPoints(from: Point, to: Point, side: 1 | -1, size: number): Point[] {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dx, dy)
  const ux = dx / length
  const uy = dy / length
  // Clockwise normal in SVG's y-down space: (1,0) → (0,1), (0,1) → (-1,0).
  const nx = -uy * side
  const ny = ux * side

  return KNOB.map(([v, w], i) => {
    // The endpoints stay on the corners; the knob itself is centred on the
    // seam and sized from the cell, not from the seam's length.
    const along = i === 0 ? 0 : i === KNOB.length - 1 ? length : length / 2 + (v - 0.5) * size
    const across = w * size
    return [from[0] + ux * along + nx * across, from[1] + uy * along + ny * across] as const
  })
}

const fmt = (n: number) => Number(n.toFixed(2)).toString()

/** The `C` commands that continue a path already standing at `points[0]`. */
function cubics(points: readonly Point[]): string {
  let d = ''
  for (let i = 1; i < points.length; i += 3) {
    const [a, b, c] = [points[i], points[i + 1], points[i + 2]]
    d += ` C ${fmt(a[0])} ${fmt(a[1])} ${fmt(b[0])} ${fmt(b[1])} ${fmt(c[0])} ${fmt(c[1])}`
  }
  return d
}

export function puzzlePieces(
  cols: number,
  rows: number,
  cellW: number,
  cellH: number,
): PuzzlePiece[] {
  const size = Math.min(cellW, cellH)
  const reach = REACH * size

  // Horizontal seams run left → right along the bottom of row `r`; their knobs
  // all hang downward, so every piece sits on the one below it. Vertical seams
  // run top → bottom along the right of column `c` and alternate sides so the
  // cut still looks like a jigsaw rather than a stamp.
  const horizontal: Point[][][] = []
  for (let r = 0; r < rows - 1; r++) {
    horizontal[r] = []
    for (let c = 0; c < cols; c++) {
      const y = (r + 1) * cellH
      horizontal[r][c] = seamPoints([c * cellW, y], [(c + 1) * cellW, y], 1, size)
    }
  }
  const vertical: Point[][][] = []
  for (let c = 0; c < cols - 1; c++) {
    vertical[c] = []
    for (let r = 0; r < rows; r++) {
      const x = (c + 1) * cellW
      const side = (r + c) % 2 === 0 ? 1 : -1
      vertical[c][r] = seamPoints([x, r * cellH], [x, (r + 1) * cellH], side, size)
    }
  }

  const pieces: PuzzlePiece[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x0 = col * cellW
      const y0 = row * cellH
      const x1 = x0 + cellW
      const y1 = y0 + cellH

      let d = `M ${fmt(x0)} ${fmt(y0)}`
      // Clockwise from the top-left corner. Border edges are straight; shared
      // seams are walked forwards on the top and right, backwards on the
      // bottom and left so the outline stays continuous.
      d += row === 0 ? ` L ${fmt(x1)} ${fmt(y0)}` : cubics(horizontal[row - 1][col])
      d += col === cols - 1 ? ` L ${fmt(x1)} ${fmt(y1)}` : cubics(vertical[col][row])
      d += row === rows - 1 ? ` L ${fmt(x0)} ${fmt(y1)}` : cubics([...horizontal[row][col]].reverse())
      d += col === 0 ? '' : cubics([...vertical[col - 1][row]].reverse())
      d += ' Z'

      pieces.push({
        col,
        row,
        d,
        x: x0,
        y: y0,
        w: cellW,
        h: cellH,
        bbox: { x: x0 - reach, y: y0 - reach, w: cellW + 2 * reach, h: cellH + 2 * reach },
      })
    }
  }
  return pieces
}
