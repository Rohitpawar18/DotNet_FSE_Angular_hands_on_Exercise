using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using CalcLibrary;

namespace CalcLibrary.Tests
{
    [TestFixture]
    public class CalculatorTests
    {
        private Calculator calculator;

        [SetUp]
        public void Init()
        {
            calculator = new Calculator();
        }

        [TearDown]
        public void Cleanup()
        {
            calculator = null;
        }

        [Test]
        [TestCase(10, 20, 30)]
        [TestCase(5, 5, 10)]
        [TestCase(100, 200, 300)]
        public void Add_ReturnsExpectedResult(
            int num1,
            int num2,
            int expectedResult)
        {
            int actualResult =
                calculator.Add(num1, num2);

            Assert.That(
                actualResult,
                Is.EqualTo(expectedResult));
        }
    }
}