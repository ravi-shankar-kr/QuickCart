const Footer = () => {
  return (
    <footer className="border-t border-[#E5E5E5] dark:border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[#111111] dark:text-white">
          QuickCart
        </p>
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} QuickCart. All prices in INR.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
