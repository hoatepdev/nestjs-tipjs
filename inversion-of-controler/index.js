var TeamVF3 = /** @class */ (function () {
    function TeamVF3() {
    }
    TeamVF3.prototype.produceCar = function () {
        console.log("Team VF3 produce ...");
    };
    TeamVF3.prototype.makeCar = function () {
        this.produceCar();
    };
    return TeamVF3;
}());
var TeamVF5 = /** @class */ (function () {
    function TeamVF5() {
    }
    TeamVF5.prototype.produceCar = function () {
        console.log("Team VF5 produce ...");
    };
    TeamVF5.prototype.makeCar = function () {
        this.produceCar();
    };
    return TeamVF5;
}());
var TeamLead = /** @class */ (function () {
    function TeamLead(teamCar) {
        this.teamCar = teamCar;
    }
    TeamLead.prototype.task = function () {
        this.teamCar.makeCar();
    };
    return TeamLead;
}());
var TeamCompany = /** @class */ (function () {
    function TeamCompany() {
    }
    TeamCompany.prototype.order = function () {
        var teamVF3 = new TeamVF3();
        var teamLead = new TeamLead(teamVF3);
        teamLead.task();
    };
    return TeamCompany;
}());
var teamCompany = new TeamCompany();
teamCompany.order();
