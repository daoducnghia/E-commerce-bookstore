package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    @Query(value = "SELECT COUNT(*) FROM tbl_order;", nativeQuery = true)
    int countOrder();

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.tbl_order ORDER BY purchase_date asc LIMIT 10;", nativeQuery = true)
    List<OrderEntity> findTenNewest();

}
