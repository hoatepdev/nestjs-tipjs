interface ITeamCar {
  makeCar: () => void;
}

class TeamVF3 implements ITeamCar {
  produceCar() {
    console.log("Team VF3 produce ...");
  }

  makeCar() {
    this.produceCar();
  }
}

class TeamVF5 implements ITeamCar {
  produceCar() {
    console.log("Team VF5 produce ...");
  }

  makeCar() {
    this.produceCar();
  }
}

class TeamLead {
  private teamCar: ITeamCar;
  constructor(teamCar: ITeamCar) {
    this.teamCar = teamCar;
  }

  task() {
    this.teamCar.makeCar();
  }
}

class TeamCompany {
  order() {
    const teamVF3 = new TeamVF3();
    const teamLead = new TeamLead(teamVF3);
    teamLead.task();
  }
}

const teamCompany = new TeamCompany();
teamCompany.order();
