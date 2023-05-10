package ptit.tmdt.bansach.repository;

import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AccountEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    @Query(value = "select * from database_bansach_pthttmdt_btl.account where username like ?", nativeQuery = true)
    public AccountEntity findByUsername(String username);

    @Query(value = "insert into database_bansach_pthttmdt_btl.account (account.username,account.password) values (?1,?2)", nativeQuery = true)
    public AccountEntity saveNguoiDung(String username, String password);

    @Query(value = "SELECT username FROM database_bansach_pthttmdt_btl.account", nativeQuery = true)
    public List<String> findAllUsername();

    @Query(value = "SELECT * FROM database_bansach_pthttmdt_btl.account WHERE ", nativeQuery = true)
    public AccountEntity findByUsernameId(int id);
}
