console.log("sup");

var results1 = {
  paths: [],
  expectationValue: 0
}

var results2 = {
  paths: [],
  expectationValue: 0
}

var results3 = {
  paths: [],
  expectationValue: 0
}

function calculateAllPaths(path, t, sellpoint, results) {
  if (path.length === t) {
    results.paths.push(path);
    results.expectationValue += evaluatePath(path, sellpoint);
    return;
  }

  calculateAllPaths(path + "0", t, sellpoint, results);
  calculateAllPaths(path + "1", t, sellpoint, results);
}

function evaluatePath (path, sellpoint) {
  var value = 0;
  var arr = path.split("");
  arr.forEach(priceChange => {
    if (value <= sellpoint) {
      return value;
    }

    var deltaValue = priceChange === "1" ? -1 : 1;
    value += deltaValue;
  });

  return value;
}

var allResults = [];
var sellpoint = -1;
getAllExpectationValues()

function getAllExpectationValues() {
  var results = {
    paths: [],
    expectationValue: 0
  };

  for (var t = 1; t < 20; t ++) {
     calculateAllPaths("", t, sellpoint, results);
     var expectationValue = results.expectationValue;
     allResults.push({
      expectationValue: expectationValue,
      t: t,
      sellpoint: sellpoint
    });
  }
}

function doAllTests() {
  calculateAllPaths("", 3, -1, results1);
  calculateAllPaths("", 3, -2, results2);
  calculateAllPaths("", 3, -3, results3);

  //Checking if the expectation values are correct
  console.log("Checking if the expectation values are correct");
  console.log(results1.expectationValue === 0);
  console.log(results2.expectationValue === 0);
  console.log(results3.expectationValue === 0);
}

doAllTests();
