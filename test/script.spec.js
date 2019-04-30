let expect = require('unexpected');

function yearArray() {
  var a = [];
  for (var i = 2002; i < 2020; i++) {
    a.push(i);
  }
  return a;
}

describe('Year array', () => {
  it('should make array', () => {
    let year = yearArray();
    expect(year, 'to be an', 'array');
  });

  it('should contain array of specific year', () => {
    let year = yearArray();
    let expectedYears = [
      2002,
      2003,
      2004,
      2005,
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019
    ];
    expect(year, 'to satisfy', expectedYears);
  });
});

// describe('RowCache calculation', () => {

//   it('should have empty rowCache', () => {

//     let assignments = [];

//     assignments = sortAssignments(assignments);

//     let rowCache = assignments.reduce(reducer, []);

//     expect(rowCache, 'to satisfy', []);

//   });
