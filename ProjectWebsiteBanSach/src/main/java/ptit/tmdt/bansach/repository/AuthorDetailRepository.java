package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AuthorDetailEntity;

@Repository
public interface AuthorDetailRepository extends JpaRepository<AuthorDetailEntity, Integer> {
    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.author_detail WHERE product_id = ? limit 1", nativeQuery = true)
    AuthorDetailEntity findByProductId(Integer id);

    

}
