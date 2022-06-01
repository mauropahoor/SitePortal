import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { IndexComponent } from './components/index/index.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'quiz', component: QuizComponent},
  {path:'ranking', component: RankingComponent},
  {path:'editQuiz', component: EditQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
