import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedDatailsComponent } from './pages/feed-datails/feed-datails.component';
import { FeedsComponent } from './pages/feeds/feeds.component';
import { LogComponent } from './pages/log/log.component';
import { LogGuard } from './shared/guards/log.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'log' },
  { path: 'feed', component: FeedsComponent, canActivate: [LogGuard]},
  { path: 'feed-details', component: FeedDatailsComponent},
  { path: 'log', component: LogComponent},
  { path: '**', component: LogComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
