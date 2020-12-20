import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Survey {
  readonly id: string;
  readonly timest: string;
  readonly survey: string;
  readonly q0?: string;
  readonly a0?: string;
  readonly q1?: string;
  readonly a1?: string;
  readonly q2?: string;
  readonly a2?: string;
  readonly q3?: string;
  readonly a3?: string;
  readonly q4?: string;
  readonly a4?: string;
  readonly q5?: string;
  readonly a5?: string;
  constructor(init: ModelInit<Survey>);
  static copyOf(source: Survey, mutator: (draft: MutableModel<Survey>) => MutableModel<Survey> | void): Survey;
}