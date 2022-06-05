package ge.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "type_document")
public class ModelTypeDocument {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_type_document")
	@SequenceGenerator(name = "generator_type_document", sequenceName = "_seq_type_document")
	private Long idTypeDocument;
	private String libelleTypeDocument;
	
	@OneToMany(mappedBy = "typeDocument", cascade = CascadeType.REMOVE)
	private Set<ModelTypeDocument> typeDocument;
	
	public ModelTypeDocument() {
		super();
	}
	
	public ModelTypeDocument(Long idTypeDocument, String libelleTypeDocument) {
		super();
		this.idTypeDocument = idTypeDocument;
		this.libelleTypeDocument = libelleTypeDocument;
	}

	public Long getIdTypeDocument() {
		return idTypeDocument;
	}

	public void setIdTypeDocument(Long idTypeDocument) {
		this.idTypeDocument = idTypeDocument;
	}

	public String getLibelleTypeDocument() {
		return libelleTypeDocument;
	}

	public void setLibelleTypeDocument(String libelleTypeDocument) {
		this.libelleTypeDocument = libelleTypeDocument;
	}
	
	
}
