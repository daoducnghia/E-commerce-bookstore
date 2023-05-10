package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.ReviewEntity;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.review WHERE product_id = ?", nativeQuery = true)
    List<ReviewEntity> findByProductId(int idProduct);

}
