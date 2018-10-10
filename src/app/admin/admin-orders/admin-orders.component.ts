import { Component } from '@angular/core'
import { OrderService, Order } from '../../shared/services/order.service'
import { Observable } from 'rxjs'
// import { map } from 'rxjs/operators'

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>

  constructor(orderService: OrderService) {
    this.orders$ = orderService.getAllOrders()
    // this.orders$ = orderService.getAllOrders().pipe(
    //   map((orderArrays: string[][]) => {
    //     return [].concat
    //       .apply([], orderArrays)
    //       .map((sOrder: string) => JSON.parse(sOrder) as Order)
    //   })
    // )
  }
}
