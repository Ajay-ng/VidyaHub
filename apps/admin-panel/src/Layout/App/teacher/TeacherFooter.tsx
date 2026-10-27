export default function TeacherFooter() {
  return (
    <footer className="border-t bg-background py-2">
      <div className="text-center text-sm text-black">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://www.simcasys.com"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          Simcasys Technologies Pvt Ltd
        </a>
        
        
        
      </div>
    </footer>
  );
}