using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using Moq;
using CustomerCommLib;

namespace CustomerComm.Tests
{
    [TestFixture]
    public class CustomerCommTests
    {
        private Mock<IMailSender> _mailSenderMock = null!;
        private CustomerCommLib.CustomerComm _customerComm = null!;

        [OneTimeSetUp]
        public void Setup()
        {
            _mailSenderMock = new Mock<IMailSender>();

            _mailSenderMock
                .Setup(x => x.SendMail(
                    It.IsAny<string>(),
                    It.IsAny<string>()))
                .Returns(true);

            _customerComm =
                _customerComm = new CustomerCommLib.CustomerComm(_mailSenderMock.Object);
        }

        [Test]
        [TestCase]
        public void SendMailToCustomer_ShouldReturnTrue()
        {
            bool result =
                _customerComm.SendMailToCustomer();

            Assert.IsTrue(result);
        }
    }
}