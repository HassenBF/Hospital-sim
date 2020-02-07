import {Expect, Setup, Test, TestFixture} from 'alsatian';
import {Quarantine} from './quarantine';
import {AvailableDrugs, Drug, HealthStates} from './simulationRules.model';
import {SimulationUtils} from './simulationUtils';

@TestFixture()
export class SimulationUtilsTest {

    private quarantine: Quarantine;
    private RULES_MOCK = {
        lethalDrugInteractions: [
            {drugsCombination: [AvailableDrugs.ASPIRIN, AvailableDrugs.PARACETAMOL]}
        ],
        healthStatesRuleSets: [
            {
                patientInitialState: HealthStates.HEALTHY,
                treatments: [
                    {drugsCombination: [AvailableDrugs.INSULIN, AvailableDrugs.ANTIBIOTIC], result: HealthStates.FEVER}
                ],
            },
            {
                patientInitialState: HealthStates.FEVER,
                treatments: [
                    {drugsCombination: [AvailableDrugs.ASPIRIN], result: HealthStates.HEALTHY},
                    {drugsCombination: [AvailableDrugs.PARACETAMOL], result: HealthStates.HEALTHY}
                ]
            },
            {
                patientInitialState: HealthStates.TUBERCULOSIS,
                treatments: [
                    {drugsCombination: [AvailableDrugs.ANTIBIOTIC], result: HealthStates.HEALTHY}
                ]
            },
            {
                patientInitialState: HealthStates.DIABETES,
                treatments: [
                    {drugsCombination: [AvailableDrugs.INSULIN], result: HealthStates.DIABETES}
                ],
                mandatoryTreatments: [
                    {drugsCombination: [AvailableDrugs.INSULIN]}
                ]
            },

        ]

    }

    private usedDrugs: Drug[] = ['P'];
    private insulinAntibioticRule = {
        drugsCombination: [AvailableDrugs.INSULIN, AvailableDrugs.ANTIBIOTIC],
        result: HealthStates.FEVER
    };
    private paracetamolRule = {drugsCombination: [AvailableDrugs.PARACETAMOL], result: HealthStates.HEALTHY};

    private feverRulesSet = {
        patientInitialState: HealthStates.FEVER,
        treatments: [
            {drugsCombination: [AvailableDrugs.ASPIRIN], result: HealthStates.HEALTHY},
            {drugsCombination: [AvailableDrugs.PARACETAMOL], result: HealthStates.HEALTHY}
        ]
    };

    private diabetesRulesSet = {
        patientInitialState: HealthStates.DIABETES,
        treatments: [
            {drugsCombination: [AvailableDrugs.INSULIN], result: HealthStates.DIABETES}
        ],
        mandatoryTreatments: [
            {drugsCombination: [AvailableDrugs.INSULIN]}
        ]
    };

    private preTreatmentPatients = {F: 1, H: 2, D: 3, T: 1, X: 0};
    private postTreatmentPatients = {F: 1, H: 2, D: 3, T: 1, X: 0};

    @Setup
    public setup() {
        this.quarantine = new Quarantine({
            F: 1, H: 2, D: 3, T: 1, X: 0
        });
    }

    @Test()
    public getCoorespondingRulesIndex(): void {
        // There is a rule set corresponding to that healthState
        let correspondingRulesIndex = SimulationUtils.getCorrespondingRulesIndex('T', this.RULES_MOCK.healthStatesRuleSets);
        Expect(correspondingRulesIndex).toEqual(2);
        // There's no rule set corresponding to that healthState
        correspondingRulesIndex = SimulationUtils.getCorrespondingRulesIndex('X', this.RULES_MOCK.healthStatesRuleSets);
        Expect(correspondingRulesIndex).toEqual(-1);
    }

    @Test()
    public isThereMatchingRules(): void {
        // There's no drug combination rule that matches with the used Drugs
        let doesRuleExist = SimulationUtils.isThereMatchingRules(this.insulinAntibioticRule.drugsCombination, this.usedDrugs);
        Expect(doesRuleExist).toEqual(false);
        // There's a drug combination rule that matches with the used Drugs
        doesRuleExist = SimulationUtils.isThereMatchingRules(this.paracetamolRule.drugsCombination, this.usedDrugs);
        Expect(doesRuleExist).toEqual(true);
    }

    @Test()
    public isLethalDrugCombination(): void {
        // Drugs combination is not lethal
        let isLethal = SimulationUtils.isLethalDrugCombination(this.usedDrugs, this.RULES_MOCK.lethalDrugInteractions);
        Expect(isLethal).toEqual(false);
        // Drugs combination is lethal
        this.usedDrugs = ['As', 'P'];
        isLethal = SimulationUtils.isLethalDrugCombination(this.usedDrugs, this.RULES_MOCK.lethalDrugInteractions);
        Expect(isLethal).toEqual(true);
    }

    @Test()
    public getPostTreatmentHealthState(): void {
        // Patient's state changed to healthy
        let postTreatmentHealthState = SimulationUtils.getPostTreatmentHealthState(this.feverRulesSet, this.usedDrugs);
        Expect(postTreatmentHealthState).toEqual('H');
        // // Patient's state stayed unchanged
        this.usedDrugs = ['I'];
        postTreatmentHealthState = SimulationUtils.getPostTreatmentHealthState(this.feverRulesSet, this.usedDrugs);
        Expect(postTreatmentHealthState).toEqual('F');
        // Mandatory treatment not delivered (insulin here) ==> patient dies
        this.usedDrugs = ['P'];
        postTreatmentHealthState = SimulationUtils.getPostTreatmentHealthState(this.diabetesRulesSet, this.usedDrugs);
        Expect(postTreatmentHealthState).toEqual('X');
    }

    @Test()
    public everyoneIsDead(): void {
        // Patient's state changed to healthy
        let deadPatients = SimulationUtils.everyoneIsDead(this.preTreatmentPatients);
        Expect(deadPatients).toEqual({F: 0, H: 0, D: 0, T: 0, X: 7});
    }

    @Test()

    public switchPatientsState(): void {
        // Private preTreatmentPatients = {F: 1, H: 2, D: 3, T: 1, X: 0};
       //  Patient's state changed to healthy

        let postTreatmentPatients = SimulationUtils.switchPatientsState({F: 1, H: 2, D: 3, T: 1, X: 0},
            {F: 1, H: 2, D: 3, T: 1, X: 0},
            'H',
            'F');
        Expect(postTreatmentPatients).toEqual({F: 3, H: 0, D: 3, T: 1, X: 0});

        postTreatmentPatients = SimulationUtils.switchPatientsState({F: 1, H: 2, D: 3, T: 1, X: 0},
            {F: 1, H: 2, D: 3, T: 1, X: 0},
            'H',
            'H');
        Expect(postTreatmentPatients).toEqual({F: 1, H: 2, D: 3, T: 1, X: 0});
    }

}
