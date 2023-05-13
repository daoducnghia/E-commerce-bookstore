/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.UserEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    public List<OrderEntity> findAllByUser(UserEntity user);

    public List<OrderEntity> findAllByUser(UserEntity user, Sort sort);

    public List<OrderEntity> findAllByUserAndOrderStatus(UserEntity user, String statusOrder);

    public List<OrderEntity> findAllByUserAndOrderStatus(UserEntity user, String statusOrder, Sort sort);

    public List<OrderEntity> findAllByOrderStatusIn(List<String> statusOrder);

    @Query(value = "SELECT * FROM tbl_order WHERE order_id LIKE ?1", nativeQuery = true)
    public List<OrderEntity> getAllById(String idOrder);

    @Query(value = "SELECT COUNT(*) FROM tbl_order;", nativeQuery = true)
    int countOrder();

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.tbl_order ORDER BY purchase_date asc LIMIT 10;", nativeQuery = true)
    List<OrderEntity> findTenNewest();

    @Query(value = "SELECT\n"
            + "  tbl_order.*\n"
            + "FROM tbl_order\n"
            + "WHERE tbl_order.purchase_date BETWEEN ?1 AND ?2", nativeQuery = true)
    List<OrderEntity> findAllByPurchaseDate(Date startDate, Date endDate);
}
