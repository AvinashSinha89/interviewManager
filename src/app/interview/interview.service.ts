import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  INTERVIEW_URL,
  RECOMMENDED_QUESTIONS,
} from "app/shared/constants/endpoints-constants";
import { IInterView } from "app/shared/models/interview.interface";
import { Observable } from "rxjs";
import { IQuestionBankRequest } from "./questionBank-request.interface";
import { IQuestionBank } from "./questionBank.interface";

@Injectable({
  providedIn: "root",
})
export class InterviewService {
  constructor(private http: HttpClient) {}

  
  getRecommendedQuestions(param: any): Observable<any> {
    return this.http.get("https://msim-services.azurewebsites.net/getRecommend?pnlId=P34570");
  }

  submitInterviewFeedback(payload: IInterView): Observable<any> {
    return this.http.put(INTERVIEW_URL, payload);
  }
}
