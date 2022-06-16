package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelPersonne;

@Repository
public interface RepositoryPersonne extends JpaRepository<ge.model.ModelPersonne, Long> {

	@Query(value = "SELECT * FROM personne WHERE identifiant = ?1 AND nom = ?2 AND nom_usage = ?3 AND prenoms = ?4 AND sexe = ?5", nativeQuery = true)
	ModelPersonne getPersonne(String identifiant, String nom, String nomUsage, String prenoms, char sexe);
	
}
