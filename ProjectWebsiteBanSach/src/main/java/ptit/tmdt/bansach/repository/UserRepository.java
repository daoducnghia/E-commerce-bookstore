package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    // UserEntity save(AccountEntity account);

    // public UserEntity saveNguoiDung(String name, String email, String
    // phoneNumber);

}
