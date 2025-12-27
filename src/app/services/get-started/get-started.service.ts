import { Injectable } from '@angular/core';
import getStarted from '../../../assets/resources/get-started.json';

@Injectable({
  providedIn: 'root'
})
export class GetStartedService {
  private steps: JsonSteps[] = getStarted;
  constructor() { }

  getSteps(): StepDetails[] {
    const mapSteps = (steps: JsonSteps[]): StepDetails[] => {
      return steps.map(s => ({
        step: s.step,
        id: s.id || this.generateFeatureId(s.step),
        description: s.description,
        subSteps: s.subSteps ? mapSteps(s.subSteps) : undefined
      }));
    };
    return mapSteps(this.steps);
  }

  private generateFeatureId(feature: string): string {
    return feature.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}
export interface JsonSteps {
  step: string;
  description: string;
  id?: string;
  subSteps?: Exclude<JsonSteps, 'subSteps'>[];
}

export interface StepDetails {
  step: string;
  id: string;
  description: string;
  subSteps?: StepDetails[];
}
