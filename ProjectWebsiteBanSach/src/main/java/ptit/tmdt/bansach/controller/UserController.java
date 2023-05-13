/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.OrderRepository;
import ptit.tmdt.bansach.repository.UserRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderRepository orderRepository;

    @PostMapping("/get-top20-customer")
    public List<Customer> getTop20Customer(@RequestBody List<Date> listDate) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(listDate.get(0));
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date startDate = calendar.getTime();
            calendar.setTime(listDate.get(1));
            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date endDate = calendar.getTime();

            List<Customer> listCustomer = new ArrayList<>();
            List<UserEntity> listUser = userRepository.findAll();
            for (UserEntity u : listUser) {
                if (u.getAccount().getAccountType().equalsIgnoreCase("admin")) {
                    continue;
                }
                Customer customer = new Customer();
                List<OrderEntity> listOrder = orderRepository.findAllByUser(u);
                int numberOrder = 0;
                float revenue = 0;
                int numberOrderReturn = 0;
                for (OrderEntity or : listOrder) {
                    if (startDate.after(or.getPurchaseDate()) || endDate.before(or.getPurchaseDate())) {
                        continue;
                    }
                    numberOrder += 1;
                    if (or.getOrderStatus().equalsIgnoreCase("Huỷ")) {
                        numberOrderReturn += 1;
                    } else {
                        revenue += or.getOrderTotal();
                    }
                }
                customer.setName(u.getName());
                customer.setNumberOrder(numberOrder);
                customer.setNumberOrderReturn(numberOrderReturn);
                customer.setRevenue(revenue);
                customer.setUsername(u.getAccount().getUsername());
                listCustomer.add(customer);
            }
            listCustomer.sort(Comparator.comparing(Customer::getRevenue).reversed());
            return listCustomer.subList(0, Math.min(listCustomer.size(), 20));
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}

class Customer {

    private String name;
    private String username;
    private int numberOrder;
    private int numberOrderReturn;
    private float revenue;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getNumberOrder() {
        return numberOrder;
    }

    public void setNumberOrder(int numberOrder) {
        this.numberOrder = numberOrder;
    }

    public int getNumberOrderReturn() {
        return numberOrderReturn;
    }

    public void setNumberOrderReturn(int numberOrderReturn) {
        this.numberOrderReturn = numberOrderReturn;
    }

    public float getRevenue() {
        return revenue;
    }

    public void setRevenue(float revenue) {
        this.revenue = revenue;
    }
};
