const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["C", "Python", "Java", "Go"],
  },
  {
    name: "DevOps",
    skills: ["Docker", "Kubernetes", "Ansible", "Terraform"],
  },
  {
    name: "Cloud Platforms",
    skills: ["AWS", "Azure", "GCP", "Huawei Cloud"],
  },
  {
    name: "Databases",
    skills: ["SQL Server", "MySQL", "MariaDB", "SQLite"],
  },
  {
    name: "Operating Systems",
    skills: ["Linux", "Windows"],
  },
  {
    name: "Data Analysis",
    skills: ["PowerBI", "Excel"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-8">Skills</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-medium text-sm text-foreground mb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
