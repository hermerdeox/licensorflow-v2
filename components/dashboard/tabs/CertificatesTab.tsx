export default function CertificatesTab({ certificates }: { certificates: any[] }) {
  if (certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No certificates earned yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {certificates.map((cert) => (
        <div key={cert.id} className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">{cert.course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Issued: {new Date(cert.issuedAt).toLocaleDateString()}
          </p>
          <a 
            href={cert.certificateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Download Certificate â†’
          </a>
        </div>
      ))}
    </div>
  );
}
