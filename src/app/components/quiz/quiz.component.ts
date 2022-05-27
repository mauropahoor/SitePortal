import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private QuizService: QuizService) { }

  ngOnInit(): void {
  }

  showMenu = true;
  showQuiz = false;
  points = 0;

  questions: any[] = [];
  answers: any[] = [];

  async getQuestions(){
    this.questions = await this.QuizService.getQuestions();
  }

  startQuiz(){
    this.showMenu = false;
    this.showQuiz = true;
    this.getQuestions();
  }

  checkAnswers(){
    this.points = this.QuizService.checkAnswers(this.questions, this.answers);
    console.log(this.points, "SIUUUUUUU");
  }

  form = new FormGroup({
    0: new FormControl('', Validators.required),
    1: new FormControl('', Validators.required),
    2: new FormControl('', Validators.required),
    3: new FormControl('', Validators.required),
    4: new FormControl('', Validators.required),
    5: new FormControl('', Validators.required),
    6: new FormControl('', Validators.required),
    7: new FormControl('', Validators.required),
    8: new FormControl('', Validators.required),
    9: new FormControl('', Validators.required),
    10: new FormControl('', Validators.required),
    11: new FormControl('', Validators.required),
    12: new FormControl('', Validators.required),
    13: new FormControl('', Validators.required),
    14: new FormControl('', Validators.required),
    15: new FormControl('', Validators.required),
    16: new FormControl('', Validators.required),
  });
   
  get f(){
    return this.form.controls;
  }

   
  submit(){
    for(let i = 0; i < this.questions.length; i++){
      this.answers[i] = this.form.value[i];
    }
    this.checkAnswers();
  }
}
