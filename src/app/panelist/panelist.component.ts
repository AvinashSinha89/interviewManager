import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";
import { IInterView } from "app/shared/models/interview.interface";
import { FeedBackPreviewService } from "app/shared/services/feed-back-preview.service";
import * as moment from "moment";
import { PanelistService } from "./panelist.service";
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-panelist",
  templateUrl: "./panelist.component.html",
  styleUrls: ["./panelist.component.css"],
})
export class PanelistComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  upcomingInterviewColumns: string[] = [
    "id",
    "Candidate_Name",
    "Round",
    "Feedback",
    "Date",
    "start",
  ];

  pastInterviewColumns: string[] = [
    "id",
    "Candidate_Name",
    "Round",
    "Feedback",
    "Date",
  ];
  upcomingInterviewList: MatTableDataSource<IInterView>;
  pastInterviewList: MatTableDataSource<IInterView>;

  isPastSelected: boolean;
  upcomingList: IInterView[];
  pastList: IInterView[];
  displayInv:boolean=false;
  questionbank = []
  dataSource3: MatTableDataSource<any> ; 

  /* display Inventory */

  displayedColumns3:string[]=['id','topic','diflevel','minexp','question','expectedans']

  constructor(
    private router: Router,
    private panelistService: PanelistService,
    private feedbackPreviewService: FeedBackPreviewService,
    private toast:ToastrService
  ) {}

  ngOnInit() {
    this.getInterviewList();
  }

  ngAfterViewInit() {
    this.dataSource3.paginator = this.paginator;
  }

  getInterviewList() {
    this.panelistService
      .getInterviewListByPanelId()
      .subscribe((res: IInterView[]) => {
        this.upcomingList = res.filter((interview: IInterView) =>
          moment(interview.intDate).isAfter(new Date())
        );
        this.pastList = res.filter((interview: IInterView) =>
          moment(interview.intDate).isBefore(new Date())
        );
        this.upcomingInterviewList = new MatTableDataSource(this.upcomingList);
        this.pastInterviewList = new MatTableDataSource(this.pastList);
      });
  }

  startInterview(data) {
    this.router.navigate(["inventory"]);
  }

  showCompleted() {
    this.isPastSelected = true;
  }

  showUpcoming() {
    this.isPastSelected = false;
  }

  viewFeedback(data: IInterView) {
    const feedBackPreview: IInterviewFeedback[] = data.intFeedback;
    this.feedbackPreviewService.openDialog(feedBackPreview);
  }

  displayInventory() {
    this.panelistService.displayInv().subscribe(
      (res) => {
        var temp = []
        res.forEach(element => {
          var temp1={
            id:element.imKbId,
            topic:element.imKbTopic,
            subtopic:element.imKbSubTopic,
            diflevel:element.imKbDifLevel,
            minexp:element.imKbMinExp,
            maxexp:element.imKbMaxExp,
            question:element.imKbQues,
            expectedans:element.imKbSolu
          }
          temp.push(temp1)
        });
        this.questionbank = temp
        this.dataSource3 = new MatTableDataSource(this.questionbank)
        this.dataSource3.paginator = this.paginator;
        console.log(res)
        this.toast.success();
      },
      (err) => {
        this.toast.error(err);
      }
    );
  }
}
