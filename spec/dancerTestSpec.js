describe("Dancer", function() {

  var littleDancer;
  var timeBetweenSteps = 1000;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    littleDancer = new Dancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(littleDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that works", function() {
    littleDancer.step();
    expect(littleDancer.step).to.be.a('function');
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(littleDancer, "step");
      expect(littleDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(littleDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(littleDancer.step.callCount).to.be.equal(2);
    });
  });
});

describe("blinkyDancer", function() {

  var blinkyDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that makes its node blink", function() {
    sinon.spy(blinkyDancer.$node, 'toggle');
    blinkyDancer.step();
    expect(blinkyDancer.$node.toggle.called).to.be.true;
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(blinkyDancer, "step");
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
  });
});

describe("rainbowDancer", function() {

  var rainbowDancer;
  var timeBetweenSteps = 100;
  var clock;
  var colors = ['purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red'];

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    rainbowDancer = new RainbowDancer(10, 20, timeBetweenSteps, colors);
  });

  it("should have a jQuery $node object", function(){
    expect(rainbowDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(rainbowDancer, "step");
      expect(rainbowDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(rainbowDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(rainbowDancer.step.callCount).to.be.equal(2);
    });
  });
});

describe("movingRainbowDancer", function() {

  var movingRainbowDancer;
  var timeBetweenSteps = 100;
  var clock;
  var colors = ['purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red'];

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    movingRainbowDancer = new MovingRainbowDancer(10, 20, timeBetweenSteps, colors);
  });

  it("should have a jQuery $node object", function(){
    expect(movingRainbowDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(movingRainbowDancer, "step");
      expect(movingRainbowDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(movingRainbowDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(movingRainbowDancer.step.callCount).to.be.equal(2);
    });
  });
});

describe("Dancer Interactions", function() {

  var dancer1;
  var dancer2;
  var dancers = [];

  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    dancer1 = new Dancer(100, 100, timeBetweenSteps);
    dancer2 = new Dancer(200, 200, timeBetweenSteps);

    dancers.push(dancer1);
    dancers.push(dancer2);
  });

  it("should have a jQuery $node object", function(){
    expect(dancer1.$node).to.be.an.instanceof(jQuery);
  });

  it("should calculate its distance from another dancer", function() {
    expect(dancer1.findDistance(dancer2)).to.be.equal(Math.sqrt(100*100+100*100));
  });

  it("should find its nearest neighbor", function() {
    expect(dancer1.findNearestNeighbor(dancers)).to.be.deep.equal(dancer2);
  });

});
