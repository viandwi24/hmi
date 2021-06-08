<template>
  <div>
    <div id="div1" style="position:absolute; background-color:blue; width:100px; height: 200px;top: 200px; left: 100px;">
      a
    </div>
    <br>
    <br>
    <div id="div2" style="position:absolute; background-color:red; width:100px; height: 200px; top: 300px; left: 300px;">
      b
    </div>
    <input type="button" value="Draw Line" @click="gas">
  </div>
</template>

<script>
export default {
  setup () {
    const getOffset = (el) => {
      const rect = el.getBoundingClientRect()
      return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
      }
    }
    const connect = (div1, div2, color, thickness) => {
      const off1 = getOffset(div1)
      const off2 = getOffset(div2)
      // bottom right
      const x1 = off1.left + off1.width
      const y1 = off1.top + off1.height
      // top right
      const x2 = off2.left
      const y2 = off2.top
      // distance
      const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
      // center
      const cx = ((x1 + x2) / 2) - (length / 2)
      const cy = ((y1 + y2) / 2) - (thickness / 2)
      // angle
      const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI)
      // make hr
      const htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness +
        'px; background-color:' + color + '; line-height:1px; position:absolute; left:' +
        cx + 'px; top:' + cy + 'px; width:' + length +
        'px; -moz-transform:rotate(' + angle +
        'deg); -webkit-transform:rotate(' + angle + 'deg); -o-transform:rotate(' + angle + 'deg); -ms-transform:rotate(' + angle +
        'deg); transform:rotate(' + angle + "deg);' />"
      document.body.innerHTML += htmlLine
    }
    return {
      connect,
      gas: () => {
        const div1 = document.getElementById('div1')
        const div2 = document.getElementById('div2')
        connect(div1, div2, '#0F0', 5)
      }
    }
  }
}
</script>
