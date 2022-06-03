package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ge.model.ModelAcces;

@Repository
public interface RepositoryAcces extends JpaRepository<ModelAcces, Long>{

}
