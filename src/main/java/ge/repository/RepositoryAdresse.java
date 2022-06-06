package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelAdresse;

@Repository
public interface RepositoryAdresse extends JpaRepository<ModelAdresse, Long> {
	
	@Query(value = "SELECT * FROM adresse WHERE id_personne = ?1", nativeQuery = true)
	ModelAdresse getAdresseByPersonne(Long id);
	
	@Query(value = "SELECT adresse_email_perso FROM adresse JOIN personne ON personne.id_personne = adresse.id_personne JOIN etudiant ON etudiant.id_personne = adresse.id_personne WHERE id_niveau = ?1", nativeQuery = true)
	List<Object> getAdresseEmailByNiveau(Long id);
	
}
