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
