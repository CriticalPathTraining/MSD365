using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace InboundConnectorDemo {
  class Program {
    static void Main(string[] args) {

      string inboundUrl = "https://outlook.office.com/webhook/74e436cb-6803-4278-9c4b-d0e3765adb51@0174ec3a-837d-48c8-9d99-962a09469c74/IncomingWebhook/aa366cd3ccc94900aea7854e6d0a3147/de2c1621-496f-47df-b02b-3bad41bb1ecd";

      string json = Properties.Resources.Hello_json;

      HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");
      
      HttpClient client = new HttpClient();

      var result = client.PostAsync(inboundUrl, content).Result;

    }
  }
}
