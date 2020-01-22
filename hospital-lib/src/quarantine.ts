import {PatientsRegister} from './patientsRegister';

export class Quarantine {

    private static readonly NOT_IMPLEMENTED_MESSAGE = 'Work, work.';

    constructor(patients: PatientsRegister) {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

    public setDrugs(drugs: Array<string>): void {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

    public wait40Days(): void {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

    public report(): PatientsRegister {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }
}
