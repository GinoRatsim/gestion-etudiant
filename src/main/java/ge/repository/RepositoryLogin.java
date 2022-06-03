package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelLogin;

@Repository
public interface RepositoryLogin extends JpaRepository<ModelLogin, Long>{

	@Query(value = "SELECT * FROM login WHERE user = ?1 and pass = ?2", nativeQuery = true)
	ModelLogin findLoginByUserAndPass(String user, String pass);
	
}
