using System;

namespace AddWingtipProductsList {

	class Program {

		static void Main() {

      Console.WriteLine("Adding Team Site Content");
      Console.WriteLine();

      WingtipContentGenerator.CreateProductCategoriesTermset();
      WingtipContentGenerator.CreateProductsLists();

      Console.WriteLine();
      Console.WriteLine("The program has finsihed. Press ENTER to close this window");
      Console.WriteLine();
      Console.ReadLine();
			
    }
		
  }
}
