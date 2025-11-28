import { Injectable } from '@angular/core';
import features from '../../../assets/resources/features.json';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private features: JsonFeature[] = features as Array<JsonFeature>;
  constructor() { }

  getFeaturesSummary(): FeatureSummary[] {
    const mapFeatures = (features: JsonFeature[]): FeatureSummary[] => {
      return features.map(f => ({
        feature: f.feature,
        featureId: this.generateFeatureId(f.feature),
        digiGoat: this.parseFeatureSupport(f.digiGoat),
        wordPress: this.parseFeatureSupport(f.wordPress),
        wix: this.parseFeatureSupport(f.wix),
        subFeatures: f.subFeatures ? mapFeatures(f.subFeatures) : undefined
      }));
    };
    return mapFeatures(this.features);
  }

  getFeaturesDetails(): FeatureDetails[] {
    const mapFeatures = (features: JsonFeature[]): FeatureDetails[] => {
      return features.map(f => ({
        feature: f.feature,
        featureId: this.generateFeatureId(f.feature),
        description: f.description,
        subFeatures: f.subFeatures ? mapFeatures(f.subFeatures) : undefined
      }));
    };
    return mapFeatures(this.features);
  }
  private parseFeatureSupport(support: FeatureSupport): string {
    switch (support) {
      case true:
        return '✅';
      case false:
        return '❌';
      case 'premium':
        return '💰';
      case 'partial':
        return '💻';
      default:
        return support;
    }
  }
  private generateFeatureId(feature: string): string {
    return feature.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}

export interface FeatureSummary {
  feature: string;
  featureId: string;
  digiGoat: string;
  wordPress: string;
  wix: string;
  subFeatures?: FeatureSummary[];
}
export interface FeatureDetails {
  feature: string;
  featureId: string;
  description: string;
  subFeatures?: FeatureDetails[];
}

interface JsonFeature {
  feature: string;
  description: string;
  digiGoat: FeatureSupport;
  wordPress: FeatureSupport;
  wix: FeatureSupport;
  subFeatures?: Exclude<JsonFeature, 'subfeatures'>[];
}

/**
 * true: Fully supported
 * false: Not supported
 * 'premium': Supported with DigiGoat Premium
 * 'partial': Partially supported
 * string: Description of support level
 */
type FeatureSupport = boolean | 'premium' | 'partial' | string;
