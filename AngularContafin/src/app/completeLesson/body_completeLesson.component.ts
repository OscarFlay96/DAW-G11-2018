import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { LessonsService } from '../lesson/lesson.service';
import { User } from '../Interfaces/User/user.model';

@Component({
    selector: 'body_completeLesson',
    templateUrl:
        './body_completeLesson.component.html'
})
export class BodyCompleteLessonComponent implements OnInit {

    @Input()
    idUnit: number;

    @Input()
    idLesson: number;

    [x: string]: any;
    closeResult: string;
    response: boolean;
    public loggedUser: User;

    constructor(private modalService: NgbModal, public loginService: LoginService, private lessonService: LessonsService) {
        this.loginService.isLoggedUser();
        this.loggedUser = loginService.getLoggedUser();

    }
    ngOnInit() {
        this.completeLesson();
    }

    completeLesson() {
        this.lessonService.completeLesson(this.idUnit, this.idLesson).subscribe(
            response => this.response = response,
            error => console.log(error)
        );
        this.lessonService.isCompleted(this.idUnit, this.idLesson)
            .subscribe(
                response => console.log(response),
                error => console.log(error)
            );
    }
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}