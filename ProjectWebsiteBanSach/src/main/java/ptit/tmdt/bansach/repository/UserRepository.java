package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.user WHERE account_id = ?", nativeQuery = true)
    UserEntity findByAccountId(int accountId);

    // UserEntity save(AccountEntity account);

    // public UserEntity saveNguoiDung(String name, String email, String
    // phoneNumber);

}
