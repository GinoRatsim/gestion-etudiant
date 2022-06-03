package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryNaturePartenariat extends JpaRepository<ge.model.ModelNaturePartenariat, Long> {

}
