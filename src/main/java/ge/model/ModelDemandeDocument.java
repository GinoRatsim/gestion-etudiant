package ge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "demande_document")
public class ModelDemandeDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_demande_document")
	@SequenceGenerator(name = "generator_demande_document", sequenceName = "_seq_demande_document")
	private Long idDemandeDocument;
	@ManyToOne
	@JoinColumn(name = "id_type_document", nullable = false)
	private ModelTypeDocument typeDocument;
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	
	public ModelDemandeDocument() {
		super();
	}

	public ModelDemandeDocument(Long idDemandeDocument, ModelTypeDocument typeDocument, ModelEtudiant etudiant) {
		super();
		this.idDemandeDocument = idDemandeDocument;
		this.typeDocument = typeDocument;
		this.etudiant = etudiant;
	}

	public Long getIdDemandeDocument() {
		return idDemandeDocument;
	}

	public void setIdDemandeDocument(Long idDemandeDocument) {
		this.idDemandeDocument = idDemandeDocument;
	}

	public ModelTypeDocument getTypeDocument() {
		return typeDocument;
	}

	public void setTypeDocument(ModelTypeDocument typeDocument) {
		this.typeDocument = typeDocument;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}
		
}
