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

  noName = false;
  showMenu = true;
  showQuiz = false;
  showScore = false;
  result: any[] = [];
  points = 0;
  name: string = "";

  questions: any[] = [];
  answers: any[] = [];

  async getQuestions(){
    this.questions = await this.QuizService.getQuestions();
  }

  async startQuiz(name: string){
    if(name != ''){
      this.name = name;
      this.showMenu = false;
      this.showQuiz = true;
      this.getQuestions();
    }
    else{
      this.noName = true;
      setTimeout(() => { this.noName = false; }, 3000);
    }
  }

  checkAnswers(){
    this.result = this.QuizService.checkAnswers(this.questions, this.answers);
    this.points = this.result[0].points; //Get the points
    this.result.shift(); //Remove the points index of the vector
    this.showQuiz = false;
    this.showScore = true;
    this.QuizService.updateRanking(this.name,this.points); //Update the ranking with just the positions
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
    17: new FormControl('', Validators.required),
    18: new FormControl('', Validators.required),
    19: new FormControl('', Validators.required),
    20: new FormControl('', Validators.required),
    21: new FormControl('', Validators.required),
    22: new FormControl('', Validators.required),
    23: new FormControl('', Validators.required),
    24: new FormControl('', Validators.required),
    25: new FormControl('', Validators.required),
    26: new FormControl('', Validators.required),
    27: new FormControl('', Validators.required),
    28: new FormControl('', Validators.required),
    29: new FormControl('', Validators.required),
    30: new FormControl('', Validators.required),
    31: new FormControl('', Validators.required),
    32: new FormControl('', Validators.required),
    33: new FormControl('', Validators.required),
  });
   
  get f(){
    return this.form.controls;
  }

   
  noAnswer = false;
  submit(){
    for(let i = 0; i < this.questions.length; i++){
      this.answers[i] = this.form.value[i];
      if(this.form.value[i] == ""){
        this.noAnswer = true;
        setTimeout(() => { this.noAnswer = false; }, 3000);
        return;
      }
    }
    this.checkAnswers();
  }
}
