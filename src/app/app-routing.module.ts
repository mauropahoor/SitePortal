import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'quiz', component: QuizComponent},
  {path:'ranking', component: RankingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
