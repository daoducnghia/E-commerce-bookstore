package ptit.tmdt.bansach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.user WHERE account_id = ?", nativeQuery = true)
    UserEntity findByAccountId(int accountId);

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.user WHERE name like ?", nativeQuery = true)
    List<UserEntity> findByName(String name);

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.user WHERE user_id = ?", nativeQuery = true)
    UserEntity findByUserId(int id);

    @Query(value = "SELECT COUNT(*) FROM user;", nativeQuery = true)
    int countKH();

}
