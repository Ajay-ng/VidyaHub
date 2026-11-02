export default function TeacherFooter() {
  return (
  <footer className="fixed bottom-0 left-64 right-0 z-50 border-t bg-background py-2">
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