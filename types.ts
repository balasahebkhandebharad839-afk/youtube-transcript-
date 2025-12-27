
export interface ProcessingResult {
  cleanedText: string;
  seoKeywords: string[];
  readabilityScore: string;
  wordCount: number;
}

export interface AppState {
  inputTranscript: string;
  isProcessing: boolean;
  result: ProcessingResult | null;
  error: string | null;
  options: {
    addHeadings: boolean;
    seoFocus: boolean;
  };
}
