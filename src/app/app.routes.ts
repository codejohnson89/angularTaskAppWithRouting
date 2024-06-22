import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveTitle, resolveUserName } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    loadChildren: () => import('./users/users.routes').then(m => m.routes),
    canMatch: [dummyCanMatch],
    data: {
      message: 'hello world'
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent
  }

]
