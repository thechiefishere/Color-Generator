import { useState } from "react";

function App() {
  const [hex, setHex] = useState("#f15025");
  const [allValues, setAllValues] = useState([]);

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const toRgb = hexToRgb(hex);
    if (toRgb !== null) {
      let allVal = [];
      allVal = [...toWhite(toRgb), ...toBlack(toRgb)];

      setAllValues(allVal);
    }
  }

  function toWhite(toRgb) {
    const allVal = [];
    const redDiff = (255 - toRgb.r) / 10;
    const greenDiff = (255 - toRgb.g) / 10;
    const blueDiff = (255 - toRgb.b) / 10;

    for (let i = 0; i <= 10; i++) {
      const red = parseInt(255 - i * redDiff);
      const green = parseInt(255 - i * greenDiff);
      const blue = parseInt(255 - i * blueDiff);

      const convert = rgbToHex(red, green, blue);

      allVal.push(convert);
    }
    return allVal;
  }

  function toBlack(toRgb) {
    const allVal = [];
    const redDiff = toRgb.r / 10;
    const greenDiff = toRgb.g / 10;
    const blueDiff = toRgb.b / 10;

    for (let i = 1; i <= 10; i++) {
      const red = parseInt(toRgb.r - i * redDiff);
      const green = parseInt(toRgb.g - i * greenDiff);
      const blue = parseInt(toRgb.b - i * blueDiff);

      const convert = rgbToHex(red, green, blue);

      allVal.push(convert);
    }
    return allVal;
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="form">
        <label>Color Generator</label>
        <input
          className="text"
          type="text"
          name="code"
          placeholder={hex}
          value={hex}
          onChange={(e) => setHex(e.target.value)}
        />
        <input className="submit" type="submit" value="Submit" name="btn" />
      </form>
      <section className="color-container">
        {allValues.map((val, index) => {
          return (
            <div key={index} style={{ backgroundColor: val }}>
              {val}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
