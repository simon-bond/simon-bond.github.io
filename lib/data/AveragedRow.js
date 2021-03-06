// Generated by CoffeeScript 1.7.1
(function() {
  cas.AveragedRow = (function() {
    AveragedRow.prototype.GOOD_CUTOFF = 30;

    AveragedRow.prototype.BAD_CUTOFF = 60;

    function AveragedRow(row, endTime, handstrokeGap, duration) {
      this.fRow = row;
      this.fRowEndTime = endTime;
      this.fHandstrokeGap = handstrokeGap;
      this.fRowDuration = duration;
      this.calcStats();
    }

    AveragedRow.prototype.calcStats = function() {
      var d, dd, i, n, t, x, _i;
      n = this.getNBells();
      if (this.isHandstroke()) {
        n += this.fHandstrokeGap;
      }
      this.fAverageGap = this.fRowDuration / n;
      n = this.getRowSize();
      d = 0.0;
      dd = 0.0;
      for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
        t = this.getStrikeTime(i + 1) - this.getCorrectStrikeTime(i + 1);
        d += t * t;
        x = Math.round(Math.abs(t) / this.GOOD_CUTOFF);
        t = x * this.GOOD_CUTOFF;
        dd += t * t;
      }
      if (n > 0) {
        d = d / n;
        dd = dd / n;
      }
      this.fRowVariance = d;
      return this.fDiscreteRowVariance = dd;
    };

    AveragedRow.prototype.toString = function() {
      return this.fRow.toString();
    };

    AveragedRow.prototype.getBong = function(place) {
      return this.fRow.getBong(place);
    };

    AveragedRow.prototype.getBellAt = function(place) {
      return this.fRow.getBellAt(place);
    };

    AveragedRow.prototype.getStrikeTime = function(place) {
      return this.fRow.getStrikeTime(place);
    };

    AveragedRow.prototype.findBell = function(bell) {
      return this.fRow.findBell(bell);
    };

    AveragedRow.prototype.getCorrectStrikeTime = function(place) {
      var correctTime, timePerBell;
      timePerBell = this.fAverageGap;
      correctTime = this.fRowEndTime - Math.round(timePerBell * (this.getNBells() - place));
      return correctTime;
    };

    AveragedRow.prototype.getLatenessMilliseconds = function(place) {
      return this.getStrikeTime(place) - this.getCorrectStrikeTime(place);
    };

    AveragedRow.prototype.getPercentageDeviation = function() {
      return this.getStandardDeviation() / this.fAverageGap;
    };

    AveragedRow.prototype.getStandardDeviation = function() {
      return Math.sqrt(this.fRowVariance);
    };

    AveragedRow.prototype.getVariance = function() {
      return this.fRowVariance;
    };

    AveragedRow.prototype.getDiscreteVariance = function() {
      return this.fDiscreteRowVariance;
    };

    AveragedRow.prototype.getAveragedGap = function() {
      return this.fAverageGap;
    };

    AveragedRow.prototype.getMeanInterbellGap = function() {
      var d;
      d = 0.0;
      if (this.getRowSize() > 1) {
        d = (this.getBong(this.getRowSize()).time - this.getBong(1).time) / (this.getRowSize() - 1);
      }
      return d;
    };

    AveragedRow.prototype.isHandstroke = function() {
      return this.fRow.isHandstroke();
    };

    AveragedRow.prototype.getRowEndTime = function() {
      return this.fRowEndTime;
    };

    AveragedRow.prototype.getRowDuration = function() {
      return this.fRowDuration;
    };

    AveragedRow.prototype.getWholePullDuration = function() {
      return this.fWholePullDuration;
    };

    AveragedRow.prototype.setWholePullDuration = function(duration) {
      return this.fWholePullDuration = duration;
    };

    AveragedRow.prototype.getHandstrokeGap = function() {
      return this.fHandstrokeGap;
    };

    AveragedRow.prototype.getHandstrokeGapMs = function() {
      return this.fHandstrokeGap * this.fAverageGap;
    };

    AveragedRow.prototype.getNBells = function() {
      return this.fRow.getNBells();
    };

    AveragedRow.prototype.getRowSize = function() {
      return this.fRow.getRowSize();
    };

    AveragedRow.prototype.isGood = function() {
      return this.getStandardDeviation() <= this.GOOD_CUTOFF;
    };

    AveragedRow.prototype.isBad = function() {
      return this.getStandardDeviation() >= this.BAD_CUTOFF;
    };

    AveragedRow.prototype.isInChanges = function() {
      return this.fInChanges;
    };

    AveragedRow.prototype.setIsInChanges = function(inChanges) {
      return this.fInChanges = inChanges;
    };

    AveragedRow.prototype.isCloseToRounds = function() {
      return this.fRow.isCloseToRounds();
    };

    AveragedRow.prototype.getInChangesCount = function() {
      return this.fInChangesCount;
    };

    AveragedRow.prototype.setInChangesCount = function(inChangesCount) {
      return this.fInChangesCount = inChangesCount;
    };

    return AveragedRow;

  })();

}).call(this);
