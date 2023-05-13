/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.entity.CardEntity;
import ptit.tmdt.bansach.entity.OrderDetailEntity;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.ShipmentDetailEntity;
import ptit.tmdt.bansach.entity.ShippingInformationEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.CartRepository;
import ptit.tmdt.bansach.repository.OrderDetailRepository;
import ptit.tmdt.bansach.repository.OrderRepository;
import ptit.tmdt.bansach.repository.ProductRepository;
import ptit.tmdt.bansach.repository.ShipmentDetailRepository;
import ptit.tmdt.bansach.repository.UserRepository;
import ptit.tmdt.bansach.repository.ShippingInformationRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShipmentDetailRepository shipmentDetailRepository;

    @Autowired
    ShippingInformationRepository shippingInformationRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/get-all-order-by-id")
    public List<OrderQL> getAllOrderById(HttpServletRequest request, @RequestParam("idOrder") String idOrder) {
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            if (!acount.getAccountType().equalsIgnoreCase("admin")) {
                return new ArrayList<>();
            }
            List<OrderEntity> listOrder = orderRepository.getAllById("%" + idOrder + "%");
            List<OrderQL> listOrderQL = new ArrayList<>();
            for (OrderEntity o : listOrder) {
                OrderQL oql = new OrderQL();
                oql.setOrder(o);
                oql.setShippingInformation(shippingInformationRepository.findByOrder(o));
                oql.setListOrderDetail(orderDetailRepository.findAllByOrder(o));
                listOrderQL.add(oql);
            }
            return listOrderQL;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-all-order")
    public List<OrderQL> getAllOrder(HttpServletRequest request) {
        try {
            String username = request.getHeader("user");
            String statusOrder = request.getHeader("statusOrder");
            AccountEntity acount = accountRepository.findByUsername(username);
            if (!acount.getAccountType().equalsIgnoreCase("admin")) {
                return new ArrayList<>();
            }
            List<OrderEntity> listOrder = new ArrayList<>();
            if (statusOrder.equalsIgnoreCase("chuaxacnhan")) {
                listOrder = orderRepository.findAllByOrderStatusIn(Arrays.asList("Chờ xác nhận", "Chờ vận chuyển"));
            } else if (statusOrder.equalsIgnoreCase("daxacnhan")) {
                listOrder = orderRepository.findAllByOrderStatusIn(Arrays.asList("Đang vận chuyển"));
            } else if (statusOrder.equalsIgnoreCase("dahoanthanh")) {
                listOrder = orderRepository.findAllByOrderStatusIn(Arrays.asList("Hoàn thành", "Đã đánh giá"));
            } else if (statusOrder.equalsIgnoreCase("huy")) {
                listOrder = orderRepository.findAllByOrderStatusIn(Arrays.asList("Huy"));
            } else {
                listOrder = orderRepository.findAll();
            }
            listOrder.sort(Comparator.comparing(OrderEntity::getOrderId).reversed());
            List<OrderQL> listOrderQL = new ArrayList<>();
            for (OrderEntity o : listOrder) {
                OrderQL oql = new OrderQL();
                oql.setOrder(o);
                oql.setShippingInformation(shippingInformationRepository.findByOrder(o));
                oql.setListOrderDetail(orderDetailRepository.findAllByOrder(o));
                listOrderQL.add(oql);
            }
            return listOrderQL;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-all-order-by-user")
    public List<OrderDTO> getAllOrderByUser(HttpServletRequest request) {
        try {
            String username = request.getHeader("user");
            String statusOrder = request.getHeader("statusOrder");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            List<OrderEntity> listOrder = new ArrayList<>();
            List<OrderEntity> listOrderRe = new ArrayList<>();
            if (statusOrder.equalsIgnoreCase("choxacnhan")) {
                listOrder = orderRepository.findAllByUserAndOrderStatus(user, "Chờ xác nhận", Sort.by(Sort.Direction.DESC, "orderId"));
            } else if (statusOrder.equalsIgnoreCase("chovanchuyen")) {
                listOrder = orderRepository.findAllByUserAndOrderStatus(user, "Chờ vận chuyển", Sort.by(Sort.Direction.DESC, "orderId"));
            } else if (statusOrder.equalsIgnoreCase("dangvanchuyen")) {
                listOrder = orderRepository.findAllByUserAndOrderStatus(user, "Đang vận chuyển", Sort.by(Sort.Direction.DESC, "orderId"));
            } else if (statusOrder.equalsIgnoreCase("hoanthanh")) {
                listOrder = orderRepository.findAllByUserAndOrderStatus(user, "Hoàn thành", Sort.by(Sort.Direction.DESC, "orderId"));
                listOrder.addAll(orderRepository.findAllByUserAndOrderStatus(user, "Đã đánh giá", Sort.by(Sort.Direction.DESC, "orderId")));
            } else if (statusOrder.equalsIgnoreCase("huy")) {
                listOrder = orderRepository.findAllByUserAndOrderStatus(user, "Huỷ", Sort.by(Sort.Direction.DESC, "orderId"));
            } else {
                listOrder = orderRepository.findAllByUser(user, Sort.by(Sort.Direction.DESC, "orderId"));
            }
            List<OrderDTO> listOrderDTO = new ArrayList<>();
            for (OrderEntity o : listOrder) {
                OrderDTO odto = new OrderDTO();
                odto.setOrderId(o.getOrderId());
                odto.setPurchaseDate(o.getPurchaseDate());
                odto.setOrderTotal(o.getOrderTotal());
                odto.setTransportFee(o.getTransportFee());
                odto.setDiscount(o.getDiscount());
                odto.setPaymentMethod(o.getPaymentMethod());
                odto.setOrderStatus(o.getOrderStatus());
                odto.setMessage(o.getMessage());
                ShippingInformationEntity shippingInformation = shippingInformationRepository.findByOrder(o);
                odto.setShipmentDetailEntity(shippingInformation.getShipmentDetail());
                List<OrderDetailEntity> listOrderDetail = orderDetailRepository.findAllByOrder(o);
                List<OrderDetailDTO> OrderdetailDTOs = new ArrayList<>();
                for (OrderDetailEntity ode : listOrderDetail) {
                    OrderDetailDTO oddto = new OrderDetailDTO();
                    oddto.setOrderDetailId(ode.getOrderDetailId());
                    oddto.setPrice(ode.getPrice());
                    oddto.setQuantity(ode.getQuantity());
                    oddto.setProduct(ode.getProduct());
                    OrderdetailDTOs.add(oddto);
                }
                odto.setListOrderDetail(OrderdetailDTOs);
                listOrderDTO.add(odto);
            }
            return listOrderDTO;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-order-by-id")
    public OrderDTO getOrderByID(@RequestParam("idOrder") int idOrder) {
        try {
            OrderEntity o = orderRepository.findById(idOrder).get();
            OrderDTO odto = new OrderDTO();
            odto.setOrderId(o.getOrderId());
            odto.setPurchaseDate(o.getPurchaseDate());
            odto.setOrderTotal(o.getOrderTotal());
            odto.setTransportFee(o.getTransportFee());
            odto.setDiscount(o.getDiscount());
            odto.setPaymentMethod(o.getPaymentMethod());
            odto.setOrderStatus(o.getOrderStatus());
            odto.setMessage(o.getMessage());
            ShippingInformationEntity shippingInformation = shippingInformationRepository.findByOrder(o);
            odto.setShipmentDetailEntity(shippingInformation.getShipmentDetail());
            List<OrderDetailEntity> listOrderDetail = orderDetailRepository.findAllByOrder(o);
            List<OrderDetailDTO> OrderdetailDTOs = new ArrayList<>();
            for (OrderDetailEntity ode : listOrderDetail) {
                OrderDetailDTO oddto = new OrderDetailDTO();
                oddto.setOrderDetailId(ode.getOrderDetailId());
                oddto.setPrice(ode.getPrice());
                oddto.setQuantity(ode.getQuantity());
                oddto.setProduct(ode.getProduct());
                OrderdetailDTOs.add(oddto);
            }
            odto.setListOrderDetail(OrderdetailDTOs);
            return odto;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new OrderDTO();
    }

    @PostMapping("/save-order")
    public OrderEntity saveOrder(@RequestBody Order order, HttpServletRequest request) {
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            OrderEntity orderEntity = order.getOrder();
            orderEntity.setPurchaseDate(new Date());
            if (orderEntity.getPaymentMethod().equalsIgnoreCase("cod")) {
                orderEntity.setOrderStatus("Chờ xác nhận");
            } else {
                orderEntity.setOrderStatus("Chờ vận chuyển");
            }
            orderEntity.setUser(user);
            orderEntity = orderRepository.save(orderEntity);
            List<CardEntity> listCart = order.getListCart();
            for (CardEntity ca : listCart) {
                CardEntity c = cartRepository.findById(ca.getCardId()).get();
                System.out.println(c);
                OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
                orderDetailEntity.setOrder(orderEntity);
                orderDetailEntity.setQuantity(c.getProductCount());
                orderDetailEntity.setProduct(c.getProduct());
                orderDetailEntity.setPrice(c.getProduct().getPrice());
                orderDetailEntity = orderDetailRepository.save(orderDetailEntity);
                ProductEntity p = orderDetailEntity.getProduct();
                p.setNumberOfProductSold(p.getNumberOfProductSold() + orderDetailEntity.getQuantity());
                productRepository.save(p);
                cartRepository.delete(c);
            }
            ShipmentDetailEntity shipmentDetail = shipmentDetailRepository.findById(order.getShipmentDetail().getShipmentDetailId()).get();
            ShippingInformationEntity shippingInformation = new ShippingInformationEntity();
            shippingInformation.setOrder(orderEntity);
            shippingInformation.setShipmentDetail(shipmentDetail);
            shippingInformationRepository.save(shippingInformation);
            return orderEntity;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new OrderEntity();
    }

    @PostMapping("/update-order-status")
    public OrderEntity updateOrderStatus(@RequestBody OrderEntity order) {
        try {
            OrderEntity orderEntity = orderRepository.findById(order.getOrderId()).get();
            orderEntity.setOrderStatus(order.getOrderStatus());
            orderEntity = orderRepository.save(orderEntity);
            return orderEntity;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @PostMapping("/get-order-by-month")
    public List<ReportOrder> getOrderByMonth(@RequestBody List<Date> listDate) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(listDate.get(0));
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date startDate = calendar.getTime();
            calendar.setTime(listDate.get(1));
            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date endDate = calendar.getTime();
            List<OrderEntity> listOrder = orderRepository.findAllByPurchaseDate(startDate, endDate);
            calendar.setTime(startDate);
            Calendar cal = Calendar.getInstance();
            List<ReportOrder> listReportOrder = new ArrayList<>();
            while (calendar.getTime().before(endDate)) {
                cal.setTime(calendar.getTime());
                cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
                int numberOrder = 0;
                int numberOrderReturn = 0;
                float revenue = 0;
                float discount = 0;
                float returns = 0;
                for (OrderEntity od : listOrder) {
                    if (calendar.getTime().compareTo(od.getPurchaseDate()) <= 0 && cal.getTime().compareTo(od.getPurchaseDate()) >= 0) {
                        numberOrder += 1;
                        revenue += od.getOrderTotal() + od.getDiscount();
                        discount += od.getDiscount();
                        if (od.getOrderStatus().equalsIgnoreCase("Huỷ")) {
                            returns += od.getOrderTotal();
                            numberOrderReturn += 1;
                        }
                    }
                }
                ReportOrder reportOrder = new ReportOrder();
                int month = calendar.get(Calendar.MONTH) + 1;
                reportOrder.setTime((month < 10 ? "0" + month : month) + "-" + calendar.get(Calendar.YEAR));
                reportOrder.setNumberOrder(numberOrder);
                reportOrder.setNumberOrderReturn(numberOrderReturn);
                reportOrder.setRevenue(revenue);
                reportOrder.setDiscount(discount);
                reportOrder.setReturns(returns);
                reportOrder.setTotalRevenue(revenue - discount - returns);
                listReportOrder.add(reportOrder);
                calendar.add(Calendar.MONTH, 1);
            }
            return listReportOrder;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}

class ReportOrder {

    private String time;
    private int numberOrder;
    private int numberOrderReturn;
    private float revenue;
    private float discount;
    private float returns;
    private float totalRevenue;

    public int getNumberOrderReturn() {
        return numberOrderReturn;
    }

    public void setNumberOrderReturn(int numberOrderReturn) {
        this.numberOrderReturn = numberOrderReturn;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getNumberOrder() {
        return numberOrder;
    }

    public void setNumberOrder(int numberOrder) {
        this.numberOrder = numberOrder;
    }

    public float getRevenue() {
        return revenue;
    }

    public void setRevenue(float revenue) {
        this.revenue = revenue;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
    }

    public float getReturns() {
        return returns;
    }

    public void setReturns(float returns) {
        this.returns = returns;
    }

    public float getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(float totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
};

class Order {

    private OrderEntity order;
    private List<CardEntity> listCart;
    private ShipmentDetailEntity shipmentDetail;

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public List<CardEntity> getListCart() {
        return listCart;
    }

    public void setListCart(List<CardEntity> listCart) {
        this.listCart = listCart;
    }

    public ShipmentDetailEntity getShipmentDetail() {
        return shipmentDetail;
    }

    public void setShipmentDetail(ShipmentDetailEntity shipmentDetail) {
        this.shipmentDetail = shipmentDetail;
    }
};

class OrderDTO {

    private int orderId;
    private Date purchaseDate;
    private float orderTotal;
    private float transportFee;
    private float discount;
    private String paymentMethod;
    private String orderStatus;
    private ShipmentDetailEntity shipmentDetailEntity;
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ShipmentDetailEntity getShipmentDetailEntity() {
        return shipmentDetailEntity;
    }

    public void setShipmentDetailEntity(ShipmentDetailEntity shipmentDetailEntity) {
        this.shipmentDetailEntity = shipmentDetailEntity;
    }
    List<OrderDetailDTO> listOrderDetail;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public float getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(float orderTotal) {
        this.orderTotal = orderTotal;
    }

    public float getTransportFee() {
        return transportFee;
    }

    public void setTransportFee(float transportFee) {
        this.transportFee = transportFee;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public List<OrderDetailDTO> getListOrderDetail() {
        return listOrderDetail;
    }

    public void setListOrderDetail(List<OrderDetailDTO> listOrderDetail) {
        this.listOrderDetail = listOrderDetail;
    }
};

class OrderDetailDTO {

    public OrderDetailDTO(int orderDetailId, int quantity, float price, ProductEntity product) {
        this.orderDetailId = orderDetailId;
        this.quantity = quantity;
        this.price = price;
        this.product = product;
    }

    public OrderDetailDTO() {
    }

    @Override
    public String toString() {
        return "OrderDetailDTO{" + "orderDetailId=" + orderDetailId + ", quantity=" + quantity + ", price=" + price + ", product=" + product + '}';
    }

    private int orderDetailId;
    private int quantity;
    private float price;
    private ProductEntity product;

    public int getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(int orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }
};

class OrderQL {

    private OrderEntity order;
    private ShippingInformationEntity shippingInformation;
    private List<OrderDetailEntity> listOrderDetail;

    public List<OrderDetailEntity> getListOrderDetail() {
        return listOrderDetail;
    }

    public void setListOrderDetail(List<OrderDetailEntity> listOrderDetail) {
        this.listOrderDetail = listOrderDetail;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public ShippingInformationEntity getShippingInformation() {
        return shippingInformation;
    }

    public void setShippingInformation(ShippingInformationEntity shippingInformation) {
        this.shippingInformation = shippingInformation;
    }

}
