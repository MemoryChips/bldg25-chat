import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { ChatUser } from '../../services/models/chat-user'
import { ChatMessageService } from '../../services/chat-message.service'
import { values, addId } from '../../../shared/utils'

@Component({
  selector: 'chat-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit, OnDestroy {

  // @select(['userState', 'localUser']) localUser$: Observable<User>
  // @select(['userState', 'usersList']) users$: Observable<User[]>

  localUser: ChatUser
  users: ChatUser[]

  private subscriptions: Subscription[] = []

  constructor(
    private chatMessageService: ChatMessageService
  ) { }

  ngOnInit() {
    this.subscriptions = [
      this.chatMessageService.chatStore.chatUserState$.subscribe((cus) => {
        if (cus) { this.localUser = cus.me }
      }),
      this.chatMessageService.chatStore.chatUserState$
        // TODO: sort users by name
        // .map((rooms) => {
        //   return values(rooms.rooms).sort((a, b) => {
        //     if (a.id < b.id) { return -1 }
        //     if (a.id > b.id) { return 1 }
        //     return 0
        //   })
        // })
        .subscribe((cUS) => {
          const usersWithId = addId<ChatUser>(cUS.chatUsers)
          this.users = values<ChatUser>(usersWithId)
        })
    ]
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe()
    }
  }

}
